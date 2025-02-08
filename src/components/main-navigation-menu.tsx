import type * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navMenuConfig } from "@/config/nav-menu";
import { Icons } from "@/icons";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types";

const links = navMenuConfig.links;

export function MainNavigationMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{links ? (
					<NavigationMenuItem>
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className={navigationMenuTriggerStyle()}
								{...(link.forceReload ? { "data-astro-reload": true } : {})}
							>
								{link.title}
							</a>
						))}
					</NavigationMenuItem>
				) : null}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem: React.FC<MenuItem> = ({
	title,
	href,
	description,
	launched,
	disabled,
	external,
	forceReload,
}) => {
	const target = external ? "_blank" : undefined;

	return (
		<li>
			<a
				target={target}
				href={disabled ? undefined : href}
				{...(forceReload ? { "data-astro-reload": true } : {})}
				className={cn(
					"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
					disabled
						? "text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
						: "",
				)}
			>
				<div className="flex items-center text-sm font-medium leading-none">
					<span className="mr-2">{title}</span>
					{disabled ? (
						<Badge
							variant="secondary"
							radius="sm"
							className="h-5 px-1.5 text-xs font-medium"
						>
							SOON
						</Badge>
					) : null}
					{launched ? (
						<Badge
							radius="sm"
							className="h-5 px-1.5 text-xs font-medium bg-[#ebf5ff] hover:bg-[#ebf5ff] text-[#0068d6]"
						>
							NEW
						</Badge>
					) : null}
				</div>
				<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
					{description}
				</p>
			</a>
		</li>
	);
};
ListItem.displayName = "ListItem";
