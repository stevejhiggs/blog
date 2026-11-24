// Meta descriptions for category pages; aim for 110–160 characters
const categoryDescriptions: Record<string, string> = {
  AI: 'Posts on AI and agent-driven development, including building videoFn, a local-first video editor that agents extend, plus picking up Python along the way.',
  Me: 'About Steve Higgs and this blog: why it exists, what it covers, and the practical software development notes it shares rather than everyday flotsam.',
  dotnet: 'Posts on .NET development: ASP.NET MVC and Web API, OWIN, Project Helios, RavenDB, dependency injection, localisation, testing and architecture.',
  gatsby: 'Posts on Gatsby: moving this blog to a Gatsby static site and rendering interactive React components inside markdown posts.',
  js: 'Posts on JavaScript and ES6: building a modern frontend workflow and using generators in Node.js to get rid of callback-heavy async code.',
  learning: 'Posts on core developer skills and tools, starting with source control: why it matters, how it acts as a safety net, and how to work with it well.',
  monorepo: 'Posts on backend TypeScript monorepos with buildless internal packages, comparing setups with pnpm workspaces and with Bun to keep builds simple.',
  stats: 'Posts on measuring running systems: low-impact real-time monitoring with statsd and why averages can hide what is really happening in your metrics.'
};

export function categoryDescription(category: string) {
  return categoryDescriptions[category] ?? `Posts about ${category} from Steve Higgs' blog: practical write-ups on software development, tools and architecture, newest first.`;
}
