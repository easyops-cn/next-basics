export default function resetLegacyIframe(): void {
  const legacyIframeMountPoint = document.querySelector(
    "#legacy-iframe-mount-point"
  );
  // istanbul ignore next
  if (legacyIframeMountPoint) {
    legacyIframeMountPoint.innerHTML = "";
  }
}
