const pc = [
  {
    id: 'media-image',
    label: '图片',
    category: '媒体',
    content: `<img data-gjs-type="image" src="https://via.placeholder.com/400x300" alt="图片" style="max-width:100%;height:auto;display:block;"/>`,
  },
  {
    id: 'media-video',
    label: '视频',
    category: '媒体',
    content: `<div data-gjs-type="video" data-video-source="yt" data-video-url="https://www.youtube.com/watch?v=placeholder" style="max-width:100%;"></div>`,
  },
  {
    id: 'media-iframe',
    label: '嵌入',
    category: '媒体',
    content: `<div data-gjs-type="iframe-embed" style="position:relative;min-height:300px;background:#000;overflow:hidden;"><iframe src="" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;background-color:black" allowfullscreen></iframe></div>`,
  },
]

const app = [
  {
    id: 'media-image',
    label: '图片',
    category: '媒体',
    content: `<img data-gjs-type="image" src="https://via.placeholder.com/400x300" alt="图片" style="max-width:100%;height:auto;display:block;"/>`,
  },
  {
    id: 'media-video',
    label: '视频',
    category: '媒体',
    content: `<div data-gjs-type="video" data-video-source="yt" data-video-url="https://www.youtube.com/watch?v=placeholder" style="max-width:100%;"></div>`,
  },
  {
    id: 'media-iframe',
    label: '嵌入',
    category: '媒体',
    content: `<div data-gjs-type="iframe-embed" style="position:relative;min-height:12.5rem;border-radius:0.25rem;background:#000;overflow:hidden;">
      <iframe src="" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe>
    </div>`,
  },
]

export default (canvasMode) => canvasMode === 'APP' ? app : pc
