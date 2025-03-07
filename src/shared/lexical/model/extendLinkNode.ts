import { LinkNode as LexicalLinkNode, LinkAttributes } from '@lexical/link';
import { Spread } from 'lexical';

export class CustomLinkNode extends LexicalLinkNode {
  static override getType(): string {
    return 'link';
  }

  static override clone(node: CustomLinkNode): CustomLinkNode {
    return new CustomLinkNode(
      node.__url ?? undefined, // null 값을 undefined로 변환
      (node.__target as LinkAttributes) ?? undefined, // null 값을 undefined로 변환
      node.__rel ?? undefined // null 값을 undefined로 변환
    );
  }

  createDOM(config: Spread<any, any>): HTMLElement {
    const dom = super.createDOM(config);
    dom.setAttribute('target', '_blank');
    dom.setAttribute('rel', 'noopener noreferrer');
    return dom;
  }
}
