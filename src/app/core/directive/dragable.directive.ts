import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DragService } from '../services/drag.service';

@Directive({
  selector: '[appDragable]'
})
export class DragableDirective {
  private onDragStart!: Function;
  private onDragEnd!: Function;

  // Options for the directive
  private options!: DraggableOptions;

  @Input() set appDragable(options: DraggableOptions) {
    if (options) {
      this.options = options
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dragService: DragService
  ) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'draggable', true)
    this.renderer.addClass(this.elementRef.nativeElement, 'app-dragable')
  }

  ngOnInit() {
    this.addDragEvents()
  }

  ngOnDestroy() {
    this.onDragStart()
    this.onDragEnd()
  }

  private addDragEvents() {
    this.onDragStart = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragstart',
      (event: DragEvent) => {
        this.dragService.startDrag(this.options.zone)
        event.dataTransfer?.setData('Text', JSON.stringify(this.options.data))
      }
    )

    this.onDragEnd = this.renderer.listen(
      this.elementRef.nativeElement,
      'dragend',
      (event: DragEvent) => {
        this.dragService.removeHighLightedAvailableZones()
      })
  }

}

export interface DraggableOptions {
  zone: Array<string>;
  data?: any
}

