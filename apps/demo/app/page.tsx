import { Button, Card, Input, Tooltip } from "harukit";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Harukit Demo</h1>

        <div className="grid gap-8">
          {/* Button Demo */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
            <div className="flex gap-4 flex-wrap">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </section>

          {/* Input Demo */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
            <div className="grid gap-4 max-w-md">
              <Input placeholder="Default input" />
              <Input placeholder="Small input" inputSize="sm" />
              <Input placeholder="Large input" inputSize="lg" />
            </div>
          </section>

          {/* Card Demo */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cards</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Default Card</h3>
                  <p className="text-muted-foreground">
                    This is a default card with some content.
                  </p>
                </div>
              </Card>

              <Card variant="outlined">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
                  <p className="text-muted-foreground">
                    This is an outlined card variant.
                  </p>
                </div>
              </Card>

              <Card variant="elevated">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
                  <p className="text-muted-foreground">
                    This is an elevated card with shadow.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* Tooltip Demo */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Tooltips</h2>
            <div className="flex gap-4">
              <Tooltip content="This is a tooltip">
                <Button>Hover me</Button>
              </Tooltip>

              <Tooltip content="Colored tooltip" variant="colored">
                <Button variant="outline">Colored tooltip</Button>
              </Tooltip>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
