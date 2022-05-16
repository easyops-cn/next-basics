export const setTooltip = (event: any) => {
  if (event?.target?.offsetWidth < event?.target?.scrollWidth) {
    event?.target.setAttribute("title", event.target.innerHTML);
  }
};
