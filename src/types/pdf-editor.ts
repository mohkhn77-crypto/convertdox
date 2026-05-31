export type EditorMode = 'edit' | 'delete-only' | 'extract' | 'split' | 'merge' | 'view'

export type EditorFeature = 'delete' | 'rotate' | 'duplicate' | 'reorder' | 'zoom' | 'add-pages'

export interface PageState {
  pageNumber: number
  rotation: number        // 0, 90, 180, 270
  toDelete: boolean
  isDuplicate: boolean
  selected: boolean
  splitRangeId?: string
}

export interface SplitRange {
  id: string
  startPage: number
  endPage: number
  name?: string
}

export interface PDFEditorProps {
  mode: EditorMode
  features?: EditorFeature[]
  toolTitle: string
  toolDescription: string
  onComplete: (result: Blob, filename: string) => void
  backendUrl: string
}

export interface UploadSessionResponse {
  sessionId: string
  pageCount: number
  fileName: string
  fileSize: number
}
