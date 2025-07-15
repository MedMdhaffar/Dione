import os
import yt_dlp
from datetime import timedelta
import numpy as np

def format_to_mmss(seconds):
    minutes = int(seconds) // 60
    secs = int(seconds) % 60
    return f"{minutes:02}:{secs:02}"

def download_full_video(url, video_id):
    output_template = f'downloads/{video_id}_FULL.%(ext)s'
    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        'outtmpl': output_template,
        'quiet': False,
        'noplaylist': True,
        'merge_output_format': 'mp4',
        'http_headers': {
            'User-Agent': 'Mozilla/5.0',
            'Accept-Language': 'en-US,en;q=0.9',
        },
        'ffmpeg_location': '/usr/bin/ffmpeg',
        'socket_timeout': 60,
    }

    video_path = None
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        video_path = ydl.prepare_filename(info).replace('.webm', '.mp4')

    return video_path

def download_video_segment(url, video_id, start_sec, end_sec):
    output_template = f'downloads/{video_id}_{format_to_mmss(start_sec)}_{format_to_mmss(end_sec)}.%(ext)s'
    
    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        'outtmpl': output_template,
        'quiet': False,
        'noplaylist': True,
        'download_sections': [f"*{start_sec}-{end_sec}"],
        'http_headers': {
            'User-Agent': 'Mozilla/5.0',
            'Accept-Language': 'en-US,en;q=0.9',
        },
        'ffmpeg_location': '/usr/bin/ffmpeg',
        'postprocessors': [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }],
        'postprocessor_args': [
            '-ss', str(start_sec),
            '-to', str(end_sec),
            '-c:v', 'libx264',
            '-c:a', 'aac'
        ],
        'socket_timeout': 60,
    }

    video_path = None
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        video_path = ydl.prepare_filename(info).replace('.webm', '.mp4')

    return video_path

def get_segments_and_download(url, segments, video_id, full_duration):
    downloaded_videos = []
    for segment in segments:
        start = segment['start']
        end = segment['end']

        if full_duration <= 40:
            print(f"Full video duration {full_duration}s <=40s: downloading full video.")
            video_path = download_full_video(url, video_id)
        else:
            print(f"Full video duration {full_duration}s >40s: trimming ......")
            video_path = download_video_segment(url, video_id, start, end)

        if video_path:
            downloaded_videos.append(video_path)
    return downloaded_videos

def get_most_replayed_segments(url, num_segments=1, min_duration=15):
    ydl_opts = {
        'quiet': True,
        'extract_flat': True,
        'forcejson': True,
        'no_warnings': True,
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)

        heatmap = info.get('heatmap', [])
        full_duration = info.get('duration')

        if not heatmap:
            return "Heatmap data not available for this video"

        values = np.array([p['value'] for p in heatmap])
        times = np.array([p['start_time'] for p in heatmap])

        peaks = []
        threshold = np.percentile(values, 85)

        for i in range(1, len(values) - 1):
            if values[i] > threshold and values[i] > values[i - 1] and values[i] > values[i + 1]:
                start = max(0, times[i] - min_duration)
                end = times[i] + min_duration
                peaks.append({
                    'start': start,
                    'end': end,
                    'moment': format_to_mmss(times[i]),
                    'intensity': values[i]
                })

        sorted_peaks = sorted(peaks, key=lambda x: x['intensity'], reverse=True)[:num_segments]
        return sorted_peaks, full_duration

    except Exception as e:
        return f"Error: {str(e)}"

def download_peak_video(video_url):
    result = get_most_replayed_segments(video_url)
    if isinstance(result, tuple):
        most_replayed_segments, full_duration = result
        video_id = video_url.replace('https://www.youtube.com/watch?v=', '')
        downloaded_segments = get_segments_and_download(video_url, most_replayed_segments, video_id, full_duration)
        print(most_replayed_segments)
        print("Downloaded Segments:")
        for path in downloaded_segments:
            print(path)
        return True    
    else:
        print(result)
        return False
