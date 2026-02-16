import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const placeholders: { title: string; href: string; description: string }[] = [
  {
    title: "Title 1",
    href: "/title1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure itaque ad magni? Totam aliquam sed quasi in saepe repellat, animi blanditiis, magnam unde accusamus, repellendus vitae! Vero atque, rem praesentium impedit corporis repudiandae distinctio blanditiis totam accusantium explicabo veniam numquam!",
  },
  {
    title: "Title 2",
    href: "/title2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure itaque ad magni? Totam aliquam sed quasi in saepe repellat, animi blanditiis, magnam unde accusamus, repellendus vitae! Vero atque, rem praesentium impedit corporis repudiandae distinctio blanditiis totam accusantium explicabo veniam numquam!",
  },
  {
    title: "Title 3",
    href: "/title3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure itaque ad magni? Totam aliquam sed quasi in saepe repellat, animi blanditiis, magnam unde accusamus, repellendus vitae! Vero atque, rem praesentium impedit corporis repudiandae distinctio blanditiis totam accusantium explicabo veniam numquam!",
  },
  {
    title: "Title 4",
    href: "/title4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure itaque ad magni? Totam aliquam sed quasi in saepe repellat, animi blanditiis, magnam unde accusamus, repellendus vitae! Vero atque, rem praesentium impedit corporis repudiandae distinctio blanditiis totam accusantium explicabo veniam numquam!",
  },
  {
    title: "Title 5",
    href: "/title5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure itaque ad magni? Totam aliquam sed quasi in saepe repellat, animi blanditiis, magnam unde accusamus, repellendus vitae! Vero atque, rem praesentium impedit corporis repudiandae distinctio blanditiis totam accusantium explicabo veniam numquam!",
  },
  {
    title: "Title 6",
    href: "/title6",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure itaque ad magni? Totam aliquam sed quasi in saepe repellat, animi blanditiis, magnam unde accusamus, repellendus vitae! Vero atque, rem praesentium impedit corporis repudiandae distinctio blanditiis totam accusantium explicabo veniam numquam!",
  },
];

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 justify-center items-center px-4 container mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Programs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-96">
                  <ListItem href="/docs" title="1-Step Evaluations">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur voluptatum itaque quo.
                  </ListItem>
                  <ListItem href="/docs/installation" title="2-Step Evaluations">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt eos iste aspernatur, quod molestias quo.
                  </ListItem>
                  <ListItem href="/docs/primitives/typography" title="How it Works">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, doloremque.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>FAQ</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-100 md:w-120 md:grid-cols-2">
                  {placeholders.map((sample) => (
                    <ListItem key={sample.title} href={sample.href} title={sample.title}>
                      {sample.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-100 md:w-120 md:grid-cols-2">
                  {placeholders.map((sample) => (
                    <ListItem key={sample.title} href={sample.href} title={sample.title}>
                      {sample.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>BLog</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-100 md:w-120 md:grid-cols-2">
                  {placeholders.map((sample) => (
                    <ListItem key={sample.title} href={sample.href} title={sample.title}>
                      {sample.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Affiliates</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-100 md:w-120 md:grid-cols-2">
                  {placeholders.map((sample) => (
                    <ListItem key={sample.title} href={sample.href} title={sample.title}>
                      {sample.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-20 flex gap-2">
          <Button asChild>
            <Link to={"/login"}>Log In</Link>
          </Button>
          <Button variant={"secondary"}>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
