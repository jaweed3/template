const GITHUB_API = "https://api.github.com"

interface GithubConfig {
  token: string
  owner: string
  repo: string
}

export function getGithubConfig(): GithubConfig {
  return {
    token: process.env.GITHUB_TOKEN!,
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
  }
}

interface GithubFile {
  sha?: string
  content?: string
}

async function getFile(config: GithubConfig, path: string): Promise<GithubFile | null> {
  const url = `${GITHUB_API}/repos/${config.owner}/${config.repo}/contents/${path}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github.v3+json",
    },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${await res.text()}`)
  return res.json()
}

async function createOrUpdateFile(
  config: GithubConfig,
  path: string,
  content: string,
  message: string
): Promise<void> {
  const existing = await getFile(config, path)
  const url = `${GITHUB_API}/repos/${config.owner}/${config.repo}/contents/${path}`
  const body: any = {
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
  }
  if (existing?.sha) {
    body.sha = existing.sha
  }
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub API error (${res.status}): ${err}`)
  }
}

export async function publishLandingPage(
  studentName: string,
  html: string
): Promise<string> {
  const config = getGithubConfig()
  const folderName = studentName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
  const path = `template/${folderName}/index.html`

  await createOrUpdateFile(config, path, html, `Publish landing page: ${studentName}`)

  const branch = process.env.GITHUB_BRANCH || "main"
  const baseUrl = process.env.PUBLIC_URL || `https://${config.owner}.github.io/${config.repo}`
  return `${baseUrl}/template/${folderName}`
}
