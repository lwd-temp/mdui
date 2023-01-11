import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { componentStyle } from '@mdui/shared/lit-styles/component-style.js';
import { AnchorMixin } from '@mdui/shared/mixins/anchor.js';
import { FocusableMixin } from '@mdui/shared/mixins/focusable.js';
import { RippleMixin } from '../ripple/ripple-mixin.js';
import { style } from './style.js';
import type { Ripple } from '../ripple/index.js';
import type { TemplateResult, CSSResultGroup } from 'lit';
import type { Ref } from 'lit/directives/ref.js';

/**
 * @event click - 点击时触发
 * @event focus - 获得焦点时触发
 * @event blur - 失去焦点时触发
 *
 * @cssprop --shape-corner 圆角大小。可以指定一个具体的像素值；但更推荐[引用系统变量]()
 */
@customElement('mdui-card')
export class Card extends AnchorMixin(RippleMixin(FocusableMixin(LitElement))) {
  public static override styles: CSSResultGroup = [componentStyle, style];

  /**
   * 卡片形状。可选值为：
   * * `elevated`
   * * `filled`
   * * `outlined`
   */
  @property({ reflect: true })
  public variant:
    | 'elevated' /*预览图*/
    | 'filled' /*预览图*/
    | 'outlined' /*预览图*/ = 'elevated';

  /**
   * 是否可点击。为 `true` 时，会添加鼠标悬浮效果、及点击涟漪效果
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: (value: string | null): boolean =>
      value !== null && value !== 'false',
  })
  public clickable = false;

  private readonly rippleRef: Ref<Ripple> = createRef();

  protected override get rippleElement() {
    return this.rippleRef.value!;
  }

  protected override get rippleDisabled(): boolean {
    return this.disabled;
  }

  protected override get focusElement(): HTMLElement {
    return this;
  }

  protected override get focusDisabled(): boolean {
    return this.disabled;
  }

  private get disabled() {
    return !this.href && !this.clickable;
  }

  protected override render(): TemplateResult {
    return html`<mdui-ripple ${ref(this.rippleRef)}></mdui-ripple>${this.href
        ? this.renderAnchor({
            className: 'link',
            content: html`<slot></slot>`,
          })
        : html`<slot></slot>`}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mdui-card': Card;
  }
}
