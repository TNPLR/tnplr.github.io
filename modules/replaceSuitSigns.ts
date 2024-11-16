import suitSign from "./suitSign";
function replaceSuitSigns(ref: HTMLElement) :void {
  ref.innerHTML = suitSign(ref.innerHTML);
}

export default replaceSuitSigns;