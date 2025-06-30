export default {
  logo: <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Harukit</span>,
  project: {
    link: "https://github.com/your-username/harukit",
  },
  docsRepositoryBase: "https://github.com/your-username/harukit/tree/main/docs",
  footer: {
    text: "Harukit CLI Documentation",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Harukit",
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Harukit CLI" />
      <meta
        property="og:description"
        content="Modern CLI tool for beautiful UI components"
      />
    </>
  ),
  primaryHue: {
    dark: 200,
    light: 200,
  },
  primarySaturation: {
    dark: 100,
    light: 100,
  },
};
