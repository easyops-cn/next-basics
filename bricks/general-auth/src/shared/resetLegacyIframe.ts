export default function resetLegacyIframe(): void {
  const legacyIframeMountPoint = document.querySelector(
    "#legacy-iframe-mount-point"
  );
  if (legacyIframeMountPoint) {
    legacyIframeMountPoint.innerHTML = "";
  }
}
