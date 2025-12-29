import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { FileText, Calendar, Users, Mail } from "lucide-react"

export default function BoardPortalPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/images/sptc_balcony.jpg"
          alt="Saint Paul Tennis Club facilities"
          fill
          className="object-cover"
          priority
        />
      </div>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">Board Member Portal</h1>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <section className="bg-accent/50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Welcome Board Members</h2>
              <p className="text-muted-foreground">
                This portal provides board members with access to important documents, meeting schedules, and resources
                needed to effectively serve the Saint Paul Tennis Club community.
              </p>
            </section>

            {/* Quick Links Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Documents */}
              <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Documents & Resources</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Board Meeting Minutes</li>
                  <li>• Financial Reports</li>
                  <li>• Bylaws & Policies</li>
                  <li>• Strategic Plans</li>
                  <li>• Member Communications</li>
                </ul>
              </div>

              {/* Meetings */}
              <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Meeting Schedule</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Monthly Board Meetings</li>
                  <li>• Committee Meetings</li>
                  <li>• Annual General Meeting</li>
                  <li>• Special Sessions</li>
                  <li>• Meeting Agendas</li>
                </ul>
              </div>

              {/* Board Members */}
              <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Board Directory</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Board Member Contact List</li>
                  <li>• Committee Assignments</li>
                  <li>• Officer Roles</li>
                  <li>• Term Information</li>
                  <li>• Emergency Contacts</li>
                </ul>
              </div>

              {/* Communications */}
              <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">Communications</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Board Email List</li>
                  <li>• Member Announcements</li>
                  <li>• Newsletter Archive</li>
                  <li>• Press Releases</li>
                  <li>• Social Media Guidelines</li>
                </ul>
              </div>
            </div>

            {/* Important Notice */}
            <section className="bg-primary/10 border-l-4 border-primary p-6 rounded">
              <h3 className="text-xl font-semibold mb-3">Access Information</h3>
              <p className="text-muted-foreground mb-4">
                Board members should have received login credentials via email. If you need assistance accessing board
                documents or have questions about your board responsibilities, please contact the club office.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@saintpaultennisclub.com" className="text-primary hover:underline">
                  info@saintpaultennisclub.com
                </a>
              </div>
            </section>

            {/* Upcoming Meetings */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Board Meetings</h2>
              <div className="space-y-3">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Monthly Board Meeting</h4>
                      <p className="text-sm text-muted-foreground">Regular monthly meeting</p>
                    </div>
                    <span className="text-sm text-muted-foreground">TBD</span>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Finance Committee Meeting</h4>
                      <p className="text-sm text-muted-foreground">Budget review and planning</p>
                    </div>
                    <span className="text-sm text-muted-foreground">TBD</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
