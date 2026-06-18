import { Box, Container, Grid, IconButton, Paper, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import type { MouseEvent, SyntheticEvent } from 'react'
import { TreeItem, TreeView } from '@mui/x-tree-view'
import SystemsDto from '../dtos/SystemsDto'
import SystemDto from '../dtos/SystemDto'
import type { ExpressionDto } from '../dtos/ExpressionDto'
import FeatureDto from '../dtos/FeatureDto'

type ExpressionDetailDto = ExpressionDto & {
  id: string
  name: string
  description: string
}

type SystemInput = ExpressionDto & {
  expressions: ExpressionDetailDto[]
}

const systemsDto = new SystemsDto(1, 'Systemics', 'TypeScript', [
  new SystemDto(
    1,
    'WeatherSystem.ts',
    'Weather system for forecast logic',
    '/forecast',
    'forecastEngine',
    {
      expressions: [
        { id: 'expr-001', name: 'temperatureExpression', description: 'Calculates temperature for current location.' },
        { id: 'expr-002', name: 'humidityExpression', description: 'Evaluates humidity levels for alerts.' },
      ] as ExpressionDto,
    } as ExpressionDto,
    [
      new FeatureDto(1, 'forecast', 90),
      new FeatureDto(2, 'alerts', 72),
      new FeatureDto(3, 'historical-trends', 54),
    ],
  ),
  new SystemDto(
    2,
    'TradeSystem.ts',
    'Commerce system for order processing',
    '/orders',
    'tradeEngine',
    {
      expressions: [
        { id: 'expr-003', name: 'priceExpression', description: 'Determines the current order price.' },
        { id: 'expr-004', name: 'inventoryExpression', description: 'Checks stock availability.' },
      ] as ExpressionDto,
    } as ExpressionDto,
    [
      new FeatureDto(4, 'order-management', 82),
      new FeatureDto(5, 'inventory', 76),
      new FeatureDto(6, 'pricing', 65),
    ],
  ),
  new SystemDto(
    3,
    'ChatSystem.ts',
    'Communication system for messaging flows',
    '/messages',
    'chatEngine',
    {
      expressions: [
        { id: 'expr-005', name: 'sentimentExpression', description: 'Processes sentiment for chat messages.' },
        { id: 'expr-006', name: 'routingExpression', description: 'Routes messages to the correct user inbox.' },
      ] as ExpressionDto,
    } as ExpressionDto,
    [
      new FeatureDto(7, 'messaging', 88),
      new FeatureDto(8, 'notifications', 68),
      new FeatureDto(9, 'archiving', 52),
    ],
  ),
])

type RegionNode = {
  id: string
  name: string
  children: Record<string, RegionNode>
  systems: SystemDto[]
}

function buildRegionTree(systems: SystemDto[]) {
  const root: RegionNode = { id: 'root', name: 'root', children: {}, systems: [] }

  systems.forEach((system) => {
    const pathSegments = system.region.split('/').filter(Boolean)
    let node = root

    pathSegments.forEach((segment, index) => {
      const segmentId = `${pathSegments.slice(0, index + 1).join('/')}`
      if (!node.children[segment]) {
        node.children[segment] = { id: segmentId, name: segment, children: {}, systems: [] }
      }
      node = node.children[segment]
    })

    node.systems.push(system)
  })

  return root
}

function renderRegionNode(node: RegionNode) {
  const childNodes = Object.values(node.children)

  const folderLabel = node.name === 'root' ? (
    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'common.white' }}>
      Systems
    </Typography>
  ) : (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography component="span" sx={{ color: '#7dd3fc' }}>
        📁
      </Typography>
      <Typography component="span" sx={{ color: 'common.white', fontWeight: 600 }}>
        {node.name}
      </Typography>
    </Box>
  )

  return (
    <TreeItem key={node.id} nodeId={node.id} label={folderLabel}>
      {node.systems.map((system) => (
        <TreeItem
          key={system.id}
          nodeId={String(system.id)}
          label={
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography component="span" sx={{ color: '#f8fafc', fontWeight: 500 }}>
                📄 {system.name}
              </Typography>
              <Typography component="span" sx={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                {(system.inputs as SystemInput).expressions.length} expressions · {system.outputs.length} features
              </Typography>
            </Box>
          }
        />
      ))}
      {childNodes.map((child) => renderRegionNode(child))}
    </TreeItem>
  )
}

export function SystemsAside({ onSystemSelect }: { onSystemSelect: (systemId: string) => void }) {
  const regionTree = buildRegionTree(systemsDto.systems)
  const systemIds = useMemo(() => new Set(systemsDto.systems.map((system) => String(system.id))), [])

  const handleNodeSelect = (_event: SyntheticEvent, nodeId: string) => {
    if (systemIds.has(nodeId)) {
      onSystemSelect(nodeId)
    }
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 0,
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0f172a',
        color: 'common.white',
        textAlign: 'left'
      }}
    >
      <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'rgba(15, 23, 42, 0.95)' }}>
        <Typography variant="h6" sx={{ color: 'common.white' }}>
          Systems by Region
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 2 }}>
        <TreeView defaultCollapseIcon="-" defaultExpandIcon="+" onNodeSelect={handleNodeSelect} sx={{ '& .MuiTreeItem-root': { color: 'common.white' } }}>
          {renderRegionNode(regionTree)}
        </TreeView>
      </Box>
    </Paper>
  )
}

export function SystemsMain({
  openTabs,
  activeTabId,
  onTabChange,
  onCloseTab,
}: {
  openTabs: SystemDto[]
  activeTabId: string | null
  onTabChange: (event: SyntheticEvent, newValue: string) => void
  onCloseTab: (event: MouseEvent<HTMLButtonElement>, systemId: string) => void
}) {
  const systemMap = useMemo(() => new Map(systemsDto.systems.map((system) => [String(system.id), system])), [])
  const activeSystem = activeTabId ? systemMap.get(activeTabId) : undefined

  return (
    <Stack spacing={3}>
      <Paper
        elevation={1}
        sx={{
          bgcolor: '#111827',
          color: 'common.white',
          border: '1px solid rgba(148, 163, 184, 0.12)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#0f172a', px: 2, minHeight: 48 }}>
          <Tabs value={activeTabId ?? false} onChange={onTabChange} sx={{ '& .MuiTab-root': { minHeight: 48, px: 1 } }}>
            {openTabs.map((system) => (
              <Tab
                key={system.id}
                value={String(system.id)}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ color: 'common.white', fontWeight: 600 }}>{system.name}</Typography>
                    <IconButton
                      size="small"
                      onClick={(event) => onCloseTab(event, String(system.id))}
                      sx={{ color: '#cbd5e1', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
                    >
                      ×
                    </IconButton>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ p: 3, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontSize: '0.92rem', lineHeight: 1.6, bgcolor: '#111827', minHeight: 320 }}>
          {activeSystem ? (
            <Typography component="div" sx={{ whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
              {`// ${activeSystem.name}
const ${activeSystem.name.replace('.ts', '')} = {
  region: '${activeSystem.region}',
  expressions: [
    ${((activeSystem.inputs as SystemInput).expressions as ExpressionDetailDto[])
      .map(
        (expr: ExpressionDetailDto) => `{
      id: '${expr.id}',
      name: '${expr.name}',
      description: '${expr.description}'
    }`,
      )
      .join(',\n    ')}
  ],
  features: [${activeSystem.outputs.map((feature) => `'${feature.name}'`).join(', ')}]
}`}
            </Typography>
          ) : (
            <Typography sx={{ color: '#94a3b8' }}>
              Select a system in the file tree to open it in the editor.
            </Typography>
          )}
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ p: 3, bgcolor: '#0f172a', color: 'common.white' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          System insights
        </Typography>
        <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
          Review system structure and expressions while navigating the file tree. This layout is styled to feel like a code workspace with file tabs and a dark editor palette.
        </Typography>
      </Paper>
    </Stack>
  )
}

export default function Systems() {
  const [openTabs, setOpenTabs] = useState<SystemDto[]>([])
  const [activeTabId, setActiveTabId] = useState<string | null>(null)

  const handleSystemSelect = (systemId: string) => {
    const system = systemsDto.systems.find((item) => String(item.id) === systemId)
    if (!system) return

    setOpenTabs((currentTabs) => {
      if (currentTabs.some((tab) => String(tab.id) === systemId)) {
        return currentTabs
      }
      return [...currentTabs, system]
    })
    setActiveTabId(systemId)
  }

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setActiveTabId(newValue)
  }

  const handleCloseTab = (event: MouseEvent<HTMLButtonElement>, systemId: string) => {
    event.stopPropagation()
    setOpenTabs((currentTabs) => currentTabs.filter((tab) => String(tab.id) !== systemId))
    setActiveTabId((currentActive) => {
      if (currentActive !== systemId) return currentActive
      const remainingTabs = openTabs.filter((tab) => String(tab.id) !== systemId)
      return remainingTabs.length ? String(remainingTabs[0].id) : null
    })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SystemsAside onSystemSelect={handleSystemSelect} />
        </Grid>
        <Grid item xs={12} md={8}>
          <SystemsMain openTabs={openTabs} activeTabId={activeTabId} onTabChange={handleTabChange} onCloseTab={handleCloseTab} />
        </Grid>
      </Grid>
    </Container>
  )
}
