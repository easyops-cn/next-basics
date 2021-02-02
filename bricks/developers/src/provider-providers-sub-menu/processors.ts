import { developHelper } from "@next-core/brick-kit";
import { SidebarMenu, SidebarMenuItem } from "@next-core/brick-types";

interface ServiceData {
  id: string;
  bricks: string[];
}

function getServices(): ServiceData[] {
  const brickPackages = developHelper.getBrickPackages();
  const prefix = "bricks/providers-of-";
  return brickPackages
    .filter(pkg => pkg.filePath.startsWith(prefix))
    .map(pkg => ({
      id: pkg.filePath.substr(prefix.length).split("/")[0],
      bricks: pkg.bricks
    }));
}

export async function redirectTo(): Promise<string> {
  const services = getServices();
  return `/developers/providers/${services.length > 0 ? services[0].id : ""}`;
}

export async function providersSubMenu(): Promise<SidebarMenu> {
  const menuItems: SidebarMenuItem[] = getServices().map(service => ({
    text: service.id,
    to: `/developers/providers/${service.id}`
  }));
  return {
    title: "服务列表",
    menuItems
  };
}

export async function serviceData(serviceId: string): Promise<ServiceData> {
  return getServices().find(item => item.id === serviceId);
}
