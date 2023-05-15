import styles from './OverlayBoxContext.module.css'


// Overflow box 
const OverlayBoxTemplate = ({ contentHandler, content }) => {
    // clear overflow box
    const clearContentHandler = (ev) => {
        if(ev.target !== ev.currentTarget) return

        contentHandler([])
    }

    // return the overlay
    return (
        <>
            {content && (
                <section className={styles.overlay_template__section}>
                    <div className={styles.overlay_template__darkscreen}>
                        <div onClick={clearContentHandler} className={styles.overlay_template__main_content}>
                            {content}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default OverlayBoxTemplate
