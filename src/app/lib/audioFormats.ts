/** Расширения файла (без точки), разрешённые для загрузки. */
export const ALLOWED_AUDIO_EXTENSIONS = ['mp3', 'flac', 'wav', 'm4a'] as const

export type AllowedAudioExtension = (typeof ALLOWED_AUDIO_EXTENSIONS)[number]

export function extensionFromFileName(fileName: string): string | null {
    const base = fileName.split(/[/\\]/).pop() ?? ''
    const i = base.lastIndexOf('.')
    if (i < 0) return null
    return base.slice(i + 1).toLowerCase()
}

export function isAllowedAudioExtension(ext: string | null): ext is AllowedAudioExtension {
    return ext != null && (ALLOWED_AUDIO_EXTENSIONS as readonly string[]).includes(ext)
}

export function stripAudioExtension(fileName: string): string {
    const base = fileName.split(/[/\\]/).pop() ?? fileName
    const i = base.lastIndexOf('.')
    return i < 0 ? base : base.slice(0, i)
}
