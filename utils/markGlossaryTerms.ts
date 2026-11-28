import suitSign from '~/modules/suitSign';
import { cmbcGlossary } from '~/utils/cmbcGlossary';

const singleCharacterContext: Record<string, RegExp> = {
    點: /(?:[0-9一二兩三四五六七八九十百]\s*|大牌|總)點|點(?:力|數)/g,
    線: /[0-9一二兩三四五六七十]\s*線|線位/g,
    墩: /(?:[0-9一二兩三四五六七八九十]\s*|贏|輸|失)墩|墩數/g,
};

export default function markGlossaryTerms(article: HTMLElement, popupId: string) {
    const definitions = new Map<string, { canonical: string; html: string }>();
    for (const entry of cmbcGlossary) {
        const definition = document.createElement('span');
        definition.textContent = entry.definition;
        const html = suitSign(definition.innerHTML);
        for (const group of entry.terms.split('、')) {
            const names = group.split(/[（）]/).map(name => name.trim()).filter(Boolean);
            const canonical = names[0];
            if (!canonical) continue;
            for (const name of names) {
                definitions.set(name, { canonical, html: html });
            }
        }
    }

    const terms = [...definitions].sort(([a], [b]) => b.length - a.length);
    const triggers = new Map<HTMLButtonElement, string>();
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (node instanceof Element) {
                if (node.matches('[data-preserve-suit-signs]')) return NodeFilter.FILTER_REJECT;
                return node.matches('h2, h3, h4')
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP;
            }
            const parent = node.parentElement;
            if (!parent?.closest('p, li, td, th, dd, dt') ||
                parent.closest('[data-glossary-definitions], h2, h3, h4, a, button, input, select, textarea, label, summary, [contenteditable], [data-preserve-suit-signs], script, style')) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        },
    });
    const nodes: Node[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    const markedTerms = new Set<string>();
    for (const node of nodes) {
        if (!(node instanceof Text)) {
            markedTerms.clear();
            continue;
        }
        const source = node.data;
        const contextualPositions = new Map<string, Set<number>>();
        for (const [term, context] of Object.entries(singleCharacterContext)) {
            contextualPositions.set(term, new Set(
                Array.from(source.matchAll(context), match => match.index + match[0].indexOf(term)),
            ));
        }

        const fragment = document.createDocumentFragment();
        let endOfLastMatch = 0;
        for (let index = 0; index < source.length; index++) {
            const match = terms.find(([term]) => source.startsWith(term, index) &&
                (contextualPositions.get(term)?.has(index) ?? true));
            if (!match) continue;

            const [term, definition] = match;
            const start = index;
            index += term.length - 1;
            if (markedTerms.has(definition.canonical)) continue;

            markedTerms.add(definition.canonical);
            fragment.append(source.slice(endOfLastMatch, start));
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'glossary-term';
            button.textContent = term;
            button.setAttribute('aria-controls', popupId);
            button.setAttribute('aria-expanded', 'false');
            triggers.set(button, definition.html);
            fragment.append(button);
            endOfLastMatch = index + 1;
        }
        if (endOfLastMatch) {
            fragment.append(source.slice(endOfLastMatch));
            node.replaceWith(fragment);
        }
    }
    return triggers;
}
