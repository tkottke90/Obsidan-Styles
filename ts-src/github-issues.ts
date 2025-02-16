import { Endpoints } from '@octokit/types';

type IssuesResponseData = Endpoints['GET /issues']['response']['data'];

interface KanbanItem {
  title: string,
  description: string,
  labels: string,
  milestone: {
    display: string,
    link: string
  },
  createdAt: string;
};

export default function fetchIssues(token: string, owner: string, repo: string, options?: { state: 'open' | undefined }) {
  return fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=open`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).then(async response => {
    if (!response.ok) {
      throw new Error('Unable to Fetch Issues: ' + response.statusText)
    }

    return await response.json() as IssuesResponseData
  })
}

function labelDisplay(label: IssuesResponseData[0]['labels'][0]) {
  if (typeof label === 'string') {
    return label;
  }

  return label.name ?? 'Unknown';
}

function drawTable(issues: IssuesResponseData) {
  const headers = ['Index', 'Title', 'Labels']
  const data = issues.map(issue => ([ issue.number, issue.title, issue.labels.map(labelDisplay).join(', ') ]))

  dv.table(
    headers,
    data
  )
}

function drawKanban(issues: IssuesResponseData, laneList: string[]) {
  const lanes: Record<string, KanbanItem[]> = {
    'Unorganized': []
  };

  laneList.forEach(lane => {
    lanes[lane] = [];
  });

  issues.forEach(issue => {
    // Check if it has a lane label
    const labels = issue.labels
      .map(labelDisplay)
      .filter(l => l.startsWith('Kanban:'))
      .map(l => l.split(':')[1]);
    
    // Create Kanban Item
    const kanbanItem: KanbanItem = {
      title: `(${issue.number}) ${issue.title}`,
      description: issue.body_html ?? '',
      labels: issue.labels.map(labelDisplay).join(', '),
      milestone: {
        display: issue.milestone?.title ?? '',
        link: issue.milestone?.html_url ?? ''
      },
      createdAt: issue.created_at
    }

    // Add to Lane
    const lane = labels.shift() ?? 'Unorganized';

    lanes[lane].push(kanbanItem);
  });

  // Draw Kanban MD
  console.dir(lanes);

  ['Unorganized', ...laneList].forEach(swimLane => {
    dv.header(1, swimLane);
    dv.el('div', '', { cls: 'cm-line' });


    dv.paragraph(dv.markdownTaskList(lanes[swimLane].map(item => item.title)))


    dv.el('div', '', { cls: 'cm-line' });
  });
}

fetchIssues(input['token'], input['owner'], input['repo'], input['options'])
  .then((result) => drawKanban(result, input['swimLanes'] ?? [ 'Backlog' ]))
  .catch(async (error) => {
    await dv.view("Scripts/error", { message: `There was a problem pulling issues for ${input['owner']}/${input['repo']}` });
  });