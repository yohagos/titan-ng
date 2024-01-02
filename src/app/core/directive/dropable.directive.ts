import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { DragService } from '../services/drag.service';

@Directive({
  selector: '[appDropable]'
})
export class DropableDirective implements OnInit, OnDestroy {
  private onDragEnter!: Function
  private onDragLeave!: Function
  private onDragOver!: Function
  private onDrop!: Function

  public options: DropableOptions = {
    zone: 'appZone'
  }

  @Input() set appDropable(options: DropableOptions) {
    if (options) {
      this.options = options
    }
  }

  @Output() public onDropableComplete: EventEmitter<DropableEventObject> = new EventEmitter()

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dragService: DragService
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, 'app-dropable')
  }

  ngOnInit() {
    this.dragService.addAvailableZone(this.options.zone, {
      begin: () => {
        this.renderer.addClass(this.elementRef.nativeElement, 'js-app-dropable--target')
      },
      end: () => {
        this.renderer.removeClass(this.elementRef.nativeElement, 'js-app-dropable--target')
      }
    })
    this.addOnDragEvents()
  }

  ngOnDestroy() {
    this.dragService.removeAvailableZone(this.options.zone)

    this.onDragEnter()
    this.onDragLeave()
    this.onDragOver()
    this.onDrop()
  }

  private addOnDragEvents() {
    this.onDragEnter = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragenter',
      (event: DragEvent) => {
        this.handleDragEnter(event)
      }
    )

    this.onDragLeave = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragleave',
      (event: DragEvent) => {
        this.handleDragLeave(event)
      }
    )

    this.onDragOver = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragover',
      (event: DragEvent) => {
        this.handleDragOver(event)
      }
    )

    this.onDrop = this.renderer.listen(
      this.elementRef.nativeElement,
      'drop',
      (event: DragEvent) => {
        this.handleDrop(event)
      }
    )
  }

  private handleDragEnter(event: DragEvent) {
    if (this.dragService.accepts(this.options.zone)) {
      event.preventDefault()
      this.renderer.addClass(event.target, 'js-app-dropable--zone')
    }
  }

  private handleDragLeave(event: DragEvent) {
    if (this.dragService.accepts(this.options.zone)) {
      event.preventDefault()
      this.renderer.removeClass(event.target, 'js-app-dropable--zone')
    }
  }

  private handleDragOver(event: DragEvent) {
    if (this.dragService.accepts(this.options.zone)) {
      event.preventDefault()
    }
  }

  private handleDrop(event: DragEvent) {
    this.dragService.removeHighLightedAvailableZones()
    this.renderer.removeClass(event.target, 'js-app-dropable--zone')

    const data = JSON.parse(event.dataTransfer?.getData('Text') || '')
    this.onDropableComplete.emit({
      data: data,
      zone: this.options.data
    })
  }

}


export interface DropableOptions {
  data?: any
  zone: string
}

export interface DropableEventObject {
  data: any
  zone: any
}
