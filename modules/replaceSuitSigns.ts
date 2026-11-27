import suitSign from "./suitSign";

function replaceSuitSigns(ref: HTMLElement): void {
  if (typeof document === "undefined") return;

  const walker = document.createTreeWalker(ref, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (node instanceof Element) {
        return node.matches("[data-preserve-suit-signs], script, style")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_SKIP;
      }
      return /![CDHS]/.test(node.textContent ?? "")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    }
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  for (const node of textNodes) {
    const escaped = document.createElement("span");
    escaped.textContent = node.data;
    const template = document.createElement("template");
    template.innerHTML = suitSign(escaped.innerHTML);
    node.replaceWith(template.content);
  }
}

export default replaceSuitSigns;
