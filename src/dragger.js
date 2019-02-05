

export default class Dragger{

    draging = false;

    state = null;

    skipState = true;

    target(element){
        this.nodeElement = element;
        return this;
    }

    dragStart(handler){
        this.dragStartHandler = handler;
        return this;
    }

    drag(handler){
        this.dragHandler = handler;
        return this;
    }

    dragEnd(handler){
        this.dragEndHandler = handler;
        return this;
    }

    persistentState(isPersistent){
        this.skipState = !isPersistent;
        return this;
    }


    onDragStart(event){
        this.draging = true;
        this.dragStartEvent = event;
        if(this.dragStartHandler){
            this.state = this.dragStartHandler(event, this.state);
        }
    }

    onDrag(event){
        if(!this.draging) return;
        if(this.dragHandler){
            this.state = this.dragHandler(event, this.dragStartEvent, this.state);
        }
    }

    onDragEnd(event){
        if(!this.draging) return;
        this.draging = false;
        if(this.dragEndHandler){
            this.state = this.dragEndHandler(event, this.dragStartEvent, this.state);
            if(this.skipState){
                this.state = null;
            }
        }
    }


    listen(){
        this.nodeElement.addEventListener('mousedown', this.onDragStart);
        this.nodeElement.addEventListener('mousemove', this.onDrag);
        this.nodeElement.addEventListener('mouseup', this.onDragEnd);
        this.nodeElement.addEventListener('mouseleave', this.onDragEnd);
        return this;
    }

    stop(){
        this.draging = false;
        this.nodeElement.removeEventListener('mousedown', this.onDragStart);
        this.nodeElement.removeEventListener('mousemove', this.onDrag);
        this.nodeElement.removeEventListener('mouseup', this.onDragEnd);
        this.nodeElement.removeEventListener('mouseleave', this.onDragEnd);
        return this;
    }
}