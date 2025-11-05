import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Briefcase, GraduationCap, TrendingUp } from "lucide-react";

const LevelUpGuide = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="career" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="career">Career Advice</TabsTrigger>
          <TabsTrigger value="college">College Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="career" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">High-Demand Career Paths 2025-2030</h3>
            </div>

            <div className="space-y-2">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">AI/Machine Learning Engineer</p>
                <p className="text-xs text-muted-foreground mt-1">
                  💰 Avg Salary: $120k-$200k+ | Growth: 40%
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Key Skills: Python, TensorFlow, PyTorch, Data Science</li>
                  <li>• Entry Path: Computer Science + AI specialization</li>
                  <li>• Companies: OpenAI, Google, Meta, Anthropic</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Cybersecurity Specialist</p>
                <p className="text-xs text-muted-foreground mt-1">
                  💰 Avg Salary: $90k-$150k | Growth: 35%
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Key Skills: Network Security, Ethical Hacking, Cryptography</li>
                  <li>• Certs: CISSP, CEH, CompTIA Security+</li>
                  <li>• High demand due to increasing cyber threats</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Cloud Solutions Architect</p>
                <p className="text-xs text-muted-foreground mt-1">
                  💰 Avg Salary: $130k-$180k | Growth: 30%
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Key Skills: AWS/Azure/GCP, DevOps, Kubernetes</li>
                  <li>• Certs: AWS Certified Solutions Architect, Azure Expert</li>
                  <li>• Remote work opportunities globally</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">UX/UI Designer</p>
                <p className="text-xs text-muted-foreground mt-1">
                  💰 Avg Salary: $80k-$130k | Growth: 25%
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Key Skills: Figma, Adobe XD, User Research, Prototyping</li>
                  <li>• Portfolio more important than degree</li>
                  <li>• Freelance opportunities abundant</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Renewable Energy Engineer</p>
                <p className="text-xs text-muted-foreground mt-1">
                  💰 Avg Salary: $85k-$140k | Growth: 45%
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Key Skills: Solar/Wind Technology, Power Systems, Sustainability</li>
                  <li>• Growing rapidly due to climate initiatives</li>
                  <li>• Entry: Electrical/Mechanical Engineering degree</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Data Scientist</p>
                <p className="text-xs text-muted-foreground mt-1">
                  💰 Avg Salary: $100k-$170k | Growth: 36%
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Key Skills: SQL, Python, R, Statistics, Data Visualization</li>
                  <li>• High demand across all industries</li>
                  <li>• Can work remotely for international companies</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Career Success Tips</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>🎯 Build a strong online presence (LinkedIn, GitHub, Portfolio)</li>
              <li>🎯 Network actively - 70% of jobs come from connections</li>
              <li>🎯 Learn continuously - Take online courses and earn certifications</li>
              <li>🎯 Specialize in emerging technologies before they peak</li>
              <li>🎯 Consider remote work for global opportunities</li>
              <li>🎯 Negotiate salary - research market rates thoroughly</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="college" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Best College Majors for Future</h3>
            </div>

            <div className="space-y-2">
              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Computer Science</p>
                <p className="text-xs text-muted-foreground mt-1">
                  🎓 Best ROI | Starting Salary: $75k-$100k
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Core: Algorithms, Data Structures, Software Engineering</li>
                  <li>• Specializations: AI, Cybersecurity, Cloud Computing</li>
                  <li>• Job Prospects: 95%+ employment rate</li>
                  <li>• Top Schools: MIT, Stanford, Carnegie Mellon, Berkeley</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Data Science & Analytics</p>
                <p className="text-xs text-muted-foreground mt-1">
                  🎓 Fastest Growing | Starting Salary: $70k-$95k
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Core: Statistics, Machine Learning, Data Mining</li>
                  <li>• Skills: Python, R, SQL, Tableau, Power BI</li>
                  <li>• Industries: Tech, Finance, Healthcare, Retail</li>
                  <li>• Can combine with business or domain expertise</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Engineering (Various)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  🎓 High Demand | Starting Salary: $65k-$85k
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Electrical: Electronics, Power Systems, Telecommunications</li>
                  <li>• Mechanical: Robotics, Manufacturing, Automotive</li>
                  <li>• Chemical: Materials, Pharmaceuticals, Energy</li>
                  <li>• Civil: Infrastructure, Sustainable Building, Urban Planning</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Healthcare (Nursing, Pharmacy)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  🎓 Recession-Proof | Starting Salary: $60k-$90k
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Always in demand due to aging population</li>
                  <li>• Nursing: BSN opens doors to leadership roles</li>
                  <li>• Pharmacy: PharmD for clinical roles</li>
                  <li>• Travel nursing offers flexibility and high pay</li>
                </ul>
              </div>

              <div className="p-3 glass-card rounded-lg">
                <p className="font-medium text-sm">Business Analytics / Finance</p>
                <p className="text-xs text-muted-foreground mt-1">
                  🎓 Versatile | Starting Salary: $55k-$75k
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Quantitative skills highly valued</li>
                  <li>• Opens doors to consulting, banking, tech</li>
                  <li>• MBA can significantly boost earning potential</li>
                  <li>• Combine with coding skills for edge</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <h3 className="font-semibold">College Selection Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>📚 Research program rankings and career outcomes</li>
              <li>📚 Consider co-op programs for real-world experience</li>
              <li>📚 Look at professor research areas and industry connections</li>
              <li>📚 Check internship placement rates and alumni network</li>
              <li>📚 Balance cost vs. expected ROI - avoid excessive debt</li>
              <li>📚 Online programs can be equally valuable (and cheaper)</li>
            </ul>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <h3 className="font-semibold">Alternative Paths</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>💡 Coding Bootcamps: 12-24 weeks to job-ready (70k+ avg starting)</li>
              <li>💡 Trade Schools: Electrician, Plumber, HVAC (60k+ with high demand)</li>
              <li>💡 Online Certifications: Google, AWS, Microsoft (cost-effective)</li>
              <li>💡 Apprenticeships: Earn while learning in skilled trades</li>
              <li>💡 Self-taught + Portfolio: Especially viable in tech/design</li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LevelUpGuide;