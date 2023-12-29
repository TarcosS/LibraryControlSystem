export default function Logo({ size, hasText=false } : {size: number, hasText?: boolean}) {
    const textSize = size * 5 / 10;
    const gapSize = size * 3 / 10;
    
    return (
        <div 
            className={`flex flex-row items-center justify-center`}
            style={{gap: gapSize + 'px'}}
        >
            <img
                width={size}
                height={size}
                alt=""
                src={'/assets/logo.png'}
            />
            {hasText ? 
                <span
                    className={`text-white`}
                    style={{fontSize: textSize + 'px'}}
                >
                    { 'Application Name' }
                </span> : 
            null}
        </div>
    )
}