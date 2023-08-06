import React, { useRef} from 'react';
import useMouse from '@react-hook/mouse-position'

const TooltipContainer = (props: { content: React.ReactNode,children?: React.ReactNode, className: string }) =>
{
  const contentRef = useRef(null);
  const tooltipWidth = useRef<number>(0);
  const mouse = useMouse(contentRef,
  {
    enterDelay: 0,
    leaveDelay: 0,
  })

  return (
  <div ref={contentRef} className='group relative cursor-pointer'>
    {mouse.x && <div
      ref={tooltipRef =>
      {
        if (tooltipRef)
        {
          tooltipWidth.current = tooltipRef.offsetWidth
        }
      }}

      style={{ transform: `translate(${ mouse.x as number - tooltipWidth.current/2}px, ${mouse.y as number - 20}px)`}}
      className={`absolute invisible group-hover:visible ${props.className} z-10`}
    >
      {props.content}
    </div>}

    <div >
      {props.children}
    </div>
  </div>
  )
}

export default TooltipContainer;
