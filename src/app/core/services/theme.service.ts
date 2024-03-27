import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2
  private colorScheme!: string
  private colorSchemePrefix = 'color-scheme-'

  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
  }

  _detectPrefersColorSchema() {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      this.colorScheme = 'dark'
    }
  }

  _setColorScheme(scheme: string) {
    this.colorScheme = scheme
    localStorage.setItem('prefers-color', scheme)
  }

  _getColorScheme() {
    const localStorageColorScheme = localStorage.getItem('prefers-color')
    if (localStorageColorScheme) {
      this.colorScheme = localStorageColorScheme
    } else {
      this._detectPrefersColorSchema()
    }
  }

  loadTheme() {
    this.renderer.addClass(document.body, 'mat-app-background')
    this._getColorScheme()
    this.renderer.addClass(document.body, this.colorSchemePrefix + this.colorScheme)
  }

  update(scheme: string) {
    this._setColorScheme(scheme)
    this.renderer.removeClass(document.body, this.colorSchemePrefix + (this.colorScheme === 'dark' ? 'light': 'dark'))
    this.renderer.addClass(document.body, this.colorSchemePrefix + scheme);
  }

  currentActive() {
    return this.colorScheme
  }
}
