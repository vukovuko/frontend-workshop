import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { UploadComponent } from './solution'

describe('UploadComponent', () => {
  it('renders the Select file button in idle state', () => {
    const html = renderToString(<UploadComponent />)
    expect(html).toContain('Select file')
  })

  it('includes a hidden file input', () => {
    const html = renderToString(<UploadComponent />)
    expect(html).toContain('type="file"')
  })
})
