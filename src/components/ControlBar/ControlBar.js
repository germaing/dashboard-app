import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import classes from './styles/ControlBar.module.css'

//Matches the height of .dragHandle in ControlBar.module.css
export const DRAG_HANDLE_HEIGHT = 7

class ControlBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dragging: false,
        }
    }

    onStartDrag = () => {
        this.setState({ dragging: true })
        window.addEventListener('mousemove', this.onDrag)
        window.addEventListener('mouseup', this.onEndDrag)
    }

    onDrag = event => {
        event.preventDefault()
        event.stopPropagation()

        const newHeight = event.clientY

        if (
            this.props.onChangeHeight &&
            newHeight !== this.props.height &&
            newHeight > 0
        ) {
            requestAnimationFrame(() => {
                this.props.onChangeHeight(newHeight)
            })
        }
    }

    onEndDrag = () => {
        this.setState({ dragging: false })
        window.removeEventListener('mousemove', this.onDrag)
        window.removeEventListener('mouseup', this.onEndDrag)

        if (this.props.onEndDrag) {
            this.props.onEndDrag()
        }
    }

    renderDragHandle = () =>
        typeof this.props.onChangeHeight === 'function' && (
            <div
                className={classes.draghandle}
                onMouseDown={this.onStartDrag}
                data-testid="controlbar-drag-handle"
            />
        )

    render() {
        const height = Math.max(this.props.height, 0) + DRAG_HANDLE_HEIGHT

        const rootClass = cx(
            classes.root,
            this.state.dragging && classes.dragging
        )

        return (
            <div style={{ height }} className={rootClass}>
                <div className={classes.content}>{this.props.children}</div>
                {this.renderDragHandle()}
            </div>
        )
    }
}

ControlBar.propTypes = {
    /**
     * The height of the control bar in number of lines. Must be a positive integer.
     */
    children: PropTypes.node.isRequired,

    /**
     * Callback function that is called when the control bar is resized.
     * The callback receives one argument: The new height in pixels.
     *
     * If no callback is specified the control bar will not have a drag handle.
     */
    height: PropTypes.number.isRequired,

    /**
     * Callback function that is called when the control bar is dropped after being dragged.
     * The callback receives one argument: The new height in pixels.
     *
     * Ignored if no "onChangeHeight" function is provided.
     */
    onChangeHeight: PropTypes.func,

    /**
     * The contents of the control bar.
     */
    onEndDrag: PropTypes.func,
}

ControlBar.defaultProps = {
    onChangeHeight: null,
    onEndDrag: null,
}

export default ControlBar
