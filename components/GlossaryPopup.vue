<template>
    <Teleport to="body">
        <div
            v-show="activeTerm"
            :id="popupId"
            ref="popup"
            class="glossary-popup"
            role="tooltip"
            :style="popupPosition"
            @pointerleave="leavePopup"
        >
            <strong>{{ activeTerm?.textContent }}</strong>
            <div v-html="activeDefinition"></div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import markGlossaryTerms from '~/utils/markGlossaryTerms';

const props = defineProps<{ article: HTMLElement | null }>();
const popupId = useId();
const popup = useTemplateRef<HTMLElement>('popup');
const activeTerm = shallowRef<HTMLButtonElement | null>(null);
const activeDefinition = ref('');
const popupPosition = ref({ top: '0px', left: '0px', visibility: 'hidden' });
let triggers = new Map<HTMLButtonElement, string>();
let pinned = false;

function getTrigger(target: EventTarget | null) {
  const button = target instanceof Element ? target.closest('button') : null;
  return button && triggers.has(button) ? button : null;
}

function positionPopup() {
  if (!activeTerm.value || !popup.value) return;
  const anchor = activeTerm.value.getBoundingClientRect();
  const box = popup.value.getBoundingClientRect();
  const margin = 8;
  const { clientWidth, clientHeight } = document.documentElement;
  const below = clientHeight - anchor.bottom;
  const preferredTop = below >= box.height + margin || below >= anchor.top
    ? anchor.bottom
    : anchor.top - box.height;
  popupPosition.value = {
    top: `${Math.max(margin, Math.min(preferredTop, clientHeight - box.height - margin))}px`,
    left: `${Math.max(margin, Math.min(anchor.left, clientWidth - box.width - margin))}px`,
    visibility: 'visible',
  };
}

function closePopup() {
  activeTerm.value?.setAttribute('aria-expanded', 'false');
  activeTerm.value?.removeAttribute('aria-describedby');
  activeTerm.value = null;
  pinned = false;
}

function showTerm(button: HTMLButtonElement, keepOpen: boolean) {
  if (activeTerm.value !== button) {
    closePopup();
    popupPosition.value = { ...popupPosition.value, visibility: 'hidden' };
  }
  activeTerm.value = button;
  activeDefinition.value = triggers.get(button) ?? '';
  pinned = keepOpen;
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-describedby', popupId);
  nextTick(positionPopup);
}

function previewTerm(event: PointerEvent) {
  const button = getTrigger(event.target);
  if (event.pointerType === 'mouse' && button && !pinned) showTerm(button, false);
}

function leaveTerm(event: PointerEvent) {
  if (pinned || !activeTerm.value || getTrigger(event.target) !== activeTerm.value) return;
  if (event.relatedTarget instanceof Node && popup.value?.contains(event.relatedTarget)) return;
  closePopup();
}

function leavePopup(event: PointerEvent) {
  if (!pinned && getTrigger(event.relatedTarget) !== activeTerm.value) closePopup();
}

function toggleTerm(event: MouseEvent) {
  const button = getTrigger(event.target);
  if (!button) return;
  if (pinned && activeTerm.value === button) closePopup();
  else showTerm(button, true);
}

function dismissOutside(event: PointerEvent) {
  if (event.target instanceof Node && popup.value?.contains(event.target)) return;
  if (!getTrigger(event.target)) closePopup();
}

function dismissOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') closePopup();
}

let article: HTMLElement | null = null;

onMounted(async () => {
  await nextTick();
  article = props.article;
  if (!article) return;

  triggers = markGlossaryTerms(article, popupId);
  article.addEventListener('pointerover', previewTerm);
  article.addEventListener('pointerout', leaveTerm);
  article.addEventListener('click', toggleTerm);
  document.addEventListener('pointerdown', dismissOutside);
  document.addEventListener('keydown', dismissOnEscape);
  window.addEventListener('resize', positionPopup);
  window.addEventListener('scroll', positionPopup, true);
});

onBeforeUnmount(() => {
  article?.removeEventListener('pointerover', previewTerm);
  article?.removeEventListener('pointerout', leaveTerm);
  article?.removeEventListener('click', toggleTerm);
  document.removeEventListener('pointerdown', dismissOutside);
  document.removeEventListener('keydown', dismissOnEscape);
  window.removeEventListener('resize', positionPopup);
  window.removeEventListener('scroll', positionPopup, true);
});
</script>

<style scoped>
:global(.glossary-term) {
    appearance: none;
    display: inline;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-decoration: none;
}

@media screen {
    :global(.glossary-term) {
        cursor: pointer;
        text-decoration: underline dotted;
        text-underline-offset: 0.18em;
    }

    :global(.glossary-term:focus-visible) {
        outline: 2px solid #278253;
        outline-offset: 2px;
    }
}

.glossary-popup {
    position: fixed;
    z-index: 1000;
    box-sizing: border-box;
    width: max-content;
    max-width: min(24rem, calc(100vw - 16px));
    max-height: calc(100dvh - 16px);
    overflow: auto;
    padding: 0.55rem 0.75rem;
    border: 1px solid #a7d7bb;
    border-radius: 0.4rem;
    background: #eff9f2;
    color: #173b28;
    box-shadow: 0 2px 8px #0002;
    font-family: system-ui, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
    font-size: 1.05rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
}

@media print {
    :global(.glossary-term) {
        outline: none;
    }

    .glossary-popup {
        display: none !important;
    }
}
</style>
