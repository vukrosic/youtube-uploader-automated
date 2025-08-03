import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { access } from 'fs/promises';
import { join } from 'path';

const execAsync = promisify(exec);

export async function POST() {
  try {
    const videosPath = join(process.cwd(), 'videos');
    const inputPath = join(videosPath, 'output.mkv');
    const outputPath = join(videosPath, 'output.mp4');
    
    // Check if output.mkv exists
    try {
      await access(inputPath);
    } catch {
      return NextResponse.json({ error: 'output.mkv file not found. Please concatenate videos first.' }, { status: 400 });
    }

    // Use ffmpeg to convert MKV to MP4 with higher quality
    const command = `ffmpeg -i "${inputPath}" -c:v libx264 -c:a aac -preset medium -crf 18 -b:a 192k "${outputPath}" -y`;
    
    console.log('Executing conversion command:', command);
    
    const { stdout, stderr } = await execAsync(command, { 
      cwd: videosPath,
      timeout: 600000 // 10 minute timeout for conversion
    });
    
    console.log('FFmpeg stdout:', stdout);
    if (stderr) console.log('FFmpeg stderr:', stderr);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully converted output.mkv to output.mp4'
    });
    
  } catch (error) {
    console.error('Error converting video:', error);
    return NextResponse.json({ 
      error: 'Failed to convert video', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}