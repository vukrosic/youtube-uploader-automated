# Videos Directory

This directory contains your video files for processing:

- **Source videos**: Place your MKV, MP4, AVI, MOV, or WMV files here
- **Output files**: Processed videos will be saved as `output.mkv` and `output.mp4`
- **Transcripts**: Generated transcripts will be saved as `*_transcript.txt`
- **Thumbnails**: Generated thumbnails will be saved as `thumbnail-*.png`
- **Social media videos**: Generated social videos will be saved as `output_X.mp4` and `output_LinkedIn.mp4`

## File Organization

The application will automatically:
1. Sort and concatenate numbered video files (e.g., `001.mkv`, `002.mkv`)
2. Convert MKV files to high-quality MP4
3. Generate transcripts using OpenAI Whisper
4. Create social media optimized versions
5. Rename files based on video titles when uploading to YouTube