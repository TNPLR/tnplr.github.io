import suitSign from "./suitSign";
function replaceSuitSigns(ref) {
  ref.innerHTML = suitSign(ref.innerHTML);
}

export default replaceSuitSigns;