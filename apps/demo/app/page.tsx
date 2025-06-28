import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Harukit Demo</h1>
          <p className="mt-2 text-muted-foreground">
            A modern UI component library built with React and Tailwind CSS
          </p>
        </div>

        {/* Button Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Button Component</CardTitle>
            <CardDescription>
              Versatile button with multiple variants and sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🚀</Button>
            </div>
          </CardContent>
        </Card>

        {/* Card Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is a basic card component with header, content, and footer
                sections.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Another Card</CardTitle>
              <CardDescription>Another example</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Cards are great for organizing content and creating layouts.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Accordion Example */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion Component</CardTitle>
            <CardDescription>
              Collapsible content sections with smooth animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern and provides
                  full keyboard navigation support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components' aesthetic and can be fully customized.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I customize it?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! Since components are copied to your project, you
                  can modify them directly to match your design system.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>
              Input and label components for building forms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tooltip Example */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltip Component</CardTitle>
            <CardDescription>
              Hover tooltips with positioning and animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip!</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Another tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tooltips are great for providing additional context</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              How to use Harukit in your own project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Initialize Harukit</h4>
              <code className="block bg-muted p-2 rounded text-sm">
                npx harukit@latest init
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">2. Install dependencies</h4>
              <code className="block bg-muted p-2 rounded text-sm">
                npm install clsx tailwind-merge class-variance-authority
                @radix-ui/react-slot @radix-ui/react-accordion
                @radix-ui/react-label @radix-ui/react-tooltip lucide-react
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">3. Add components</h4>
              <code className="block bg-muted p-2 rounded text-sm">
                npx harukit@latest add button card accordion
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">4. Use in your code</h4>
              <code className="block bg-muted p-2 rounded text-sm">
                import {"{ Button }"} from "@/components/button"
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
