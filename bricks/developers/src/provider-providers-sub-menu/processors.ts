import { SidebarMenu, SidebarMenuItem } from "@next-core/brick-types";
import { BootstrapV2Api_brickPackageInfo } from "@next-sdk/api-gateway-sdk";
import { isEmpty } from "lodash";

interface ServiceData {
  id: string;
  bricks: string[];
}

let brickPackageCache: ServiceData[];

async function getServices(): Promise<ServiceData[]> {
  if (!isEmpty(brickPackageCache)) {
    return brickPackageCache;
  } else {
    const brickPackages = await BootstrapV2Api_brickPackageInfo();

    const prefix = "providers-of-";
    brickPackageCache = brickPackages.bricks
      .filter((name) => name.startsWith(prefix))
      .reduce((groupArr: ServiceData[], name: string) => {
        const namespace = name.substr(prefix.length).split(".")[0];
        const find = groupArr.find((item) => item.id === namespace);
        if (!find) {
          groupArr.push({
            id: namespace,
            bricks: [name],
          });
        } else {
          find.bricks.push(name);
        }
        return groupArr;
      }, []);

    return brickPackageCache;
  }
}

export async function redirectTo(): Promise<string> {
  const services = await getServices();
  return `/developers/providers/${services?.length > 0 ? services[0].id : ""}`;
}

export async function providersSubMenu(): Promise<SidebarMenu> {
  const menuItems: SidebarMenuItem[] = (await getServices()).map((service) => ({
    text: service.id,
    to: `/developers/providers/${service.id}`,
  }));
  return {
    title: "服务列表",
    menuItems,
  };
}

export async function serviceData(serviceId: string): Promise<ServiceData> {
  return (await getServices()).find((item) => item.id === serviceId);
}
