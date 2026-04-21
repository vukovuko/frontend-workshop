import { Tab, Tabs } from './solution'

export function Demo() {
  return (
    <Tabs defaultTab="Profile">
      <Tab name="Home">
        <p className="text-sm">Welcome home. This is the landing panel, shown by default.</p>
      </Tab>
      <Tab name="Profile">
        <div className="text-sm space-y-2">
          <div>
            <strong>Name:</strong> Vuko
          </div>
          <div>
            <strong>Role:</strong> Frontend engineer
          </div>
        </div>
      </Tab>
      <Tab name="Settings">
        <ul className="text-sm list-disc pl-5 space-y-1">
          <li>Theme: Light</li>
          <li>Notifications: On</li>
          <li>Language: English</li>
        </ul>
      </Tab>
    </Tabs>
  )
}
