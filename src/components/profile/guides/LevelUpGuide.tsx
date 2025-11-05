import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Briefcase, GraduationCap, TrendingUp, Target, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LevelUpGuideProps {
  surveyResponses: Record<string, string>;
}

const LevelUpGuide = ({ surveyResponses }: LevelUpGuideProps) => {
  const { career_stage, education, goal } = surveyResponses;

  const getRecommendedResources = () => {
    const resources = [];
    
    if (education === 'tech') {
      resources.push({
        name: 'Complete Software Engineering Course Bundle',
        description: 'Master DSA, System Design, and LeetCode preparation',
        price: '$149.99',
        link: '#',
        featured: true
      });
      resources.push({
        name: 'AWS Solutions Architect Certification',
        description: 'Industry-recognized cloud certification course',
        price: '$79.99',
        link: '#'
      });
    }
    
    if (education === 'business') {
      resources.push({
        name: 'MBA Essentials: Finance & Strategy',
        description: 'Learn business fundamentals from top professors',
        price: '$99.99',
        link: '#',
        featured: true
      });
      resources.push({
        name: 'Excel & Data Analytics Masterclass',
        description: 'Advanced Excel, SQL, and Tableau for business',
        price: '$59.99',
        link: '#'
      });
    }
    
    if (goal === 'entrepreneurship') {
      resources.push({
        name: 'Zero to Launch: Startup Playbook',
        description: 'Complete guide to launching and scaling your business',
        price: '$199.99',
        link: '#',
        featured: true
      });
    }
    
    if (goal === 'skills' || goal === 'switch') {
      resources.push({
        name: 'Career Transition Blueprint PDF',
        description: 'Step-by-step guide to successfully switching careers',
        price: '$49.99',
        link: '#',
        featured: true
      });
    }
    
    return resources;
  };

  const getPersonalizedCareerPath = () => {
    if (education === 'tech') {
      return {
        title: 'Tech Career Path',
        tracks: [
          {
            role: 'Software Engineer',
            salary: '$90k-$180k',
            skills: ['JavaScript/TypeScript', 'React/Node.js', 'System Design', 'Algorithms'],
            path: career_stage === 'student' 
              ? 'Build projects → Internship → Junior Dev → Mid-level (2 yrs) → Senior (5 yrs)'
              : 'Bootcamp/Online courses (3-6 months) → Portfolio projects → Entry role'
          },
          {
            role: 'Data Engineer',
            salary: '$100k-$170k',
            skills: ['Python', 'SQL', 'Spark', 'Airflow', 'Cloud (AWS/GCP)'],
            path: 'Learn data pipelines → Build ETL projects → Junior role → Specialize in streaming/batch processing'
          },
        ]
      };
    }

    if (education === 'business') {
      return {
        title: 'Business Career Path',
        tracks: [
          {
            role: 'Product Manager',
            salary: '$110k-$200k',
            skills: ['Product Strategy', 'User Research', 'Agile', 'Data Analysis'],
            path: 'APM program → PM (3 yrs) → Senior PM → Director of Product'
          },
          {
            role: 'Management Consultant',
            salary: '$85k-$150k+',
            skills: ['Problem Solving', 'Excel/PowerPoint', 'Industry Knowledge', 'Communication'],
            path: 'Analyst → Consultant (2 yrs) → Manager (4 yrs) → Partner'
          },
        ]
      };
    }

    return {
      title: 'General Career Path',
      tracks: [
        {
          role: 'Your Career',
          salary: 'Varies by field',
          skills: ['Industry-specific skills', 'Communication', 'Problem solving'],
          path: 'Entry → Mid-level → Senior → Leadership'
        }
      ]
    };
  };

  const recommendedResources = getRecommendedResources();
  const careerPath = getPersonalizedCareerPath();

  return (
    <div className="space-y-4">
      {/* Personalized Header */}
      <Card className="glass-card p-4 border-primary/50">
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Your Personalized Career Plan
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Stage: {career_stage}</Badge>
            <Badge variant="outline">Field: {education}</Badge>
            <Badge variant="outline">Goal: {goal}</Badge>
          </div>
        </div>
      </Card>

      {/* Recommended Resources */}
      {recommendedResources.length > 0 && (
        <Card className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Recommended Learning Resources</h3>
          </div>
          <div className="space-y-3">
            {recommendedResources.map((resource, idx) => (
              <div key={idx} className={`p-3 glass-card rounded-lg ${resource.featured ? 'border-2 border-primary' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{resource.name}</h4>
                  <span className="text-primary font-semibold text-sm">{resource.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                {resource.featured && (
                  <Badge className="text-xs">Recommended for your goal</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Tabs defaultValue="career" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="career">Career Roadmap</TabsTrigger>
          <TabsTrigger value="courses">Top Courses & Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="career" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{careerPath.title}</h3>
            </div>

            <div className="space-y-3">
              {careerPath.tracks.map((track, idx) => (
                <div key={idx} className="p-3 glass-card rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm">{track.role}</p>
                    <span className="text-xs text-primary font-semibold">{track.salary}</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium mb-1">Required Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {track.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1">Career Path:</p>
                      <p className="text-xs text-muted-foreground">{track.path}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Action Steps for {goal}</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              {goal === 'skills' && (
                <>
                  <li>🎯 Identify 3 high-demand skills in your field</li>
                  <li>🎯 Dedicate 1-2 hours daily to learning</li>
                  <li>🎯 Build 3-5 portfolio projects to showcase skills</li>
                  <li>🎯 Get certifications recognized in your industry</li>
                  <li>🎯 Join online communities and network actively</li>
                </>
              )}
              {goal === 'promotion' && (
                <>
                  <li>🎯 Document your achievements and impact metrics</li>
                  <li>🎯 Take on leadership in cross-functional projects</li>
                  <li>🎯 Build relationships with senior leadership</li>
                  <li>🎯 Seek mentorship from those in target role</li>
                  <li>🎯 Communicate your career goals to your manager</li>
                </>
              )}
              {goal === 'switch' && (
                <>
                  <li>🎯 Identify transferable skills from current role</li>
                  <li>🎯 Build new skills through courses/bootcamps (3-6 months)</li>
                  <li>🎯 Network with people in target industry</li>
                  <li>🎯 Create portfolio showcasing new skills</li>
                  <li>🎯 Consider contract work to gain experience</li>
                </>
              )}
              {goal === 'entrepreneurship' && (
                <>
                  <li>🎯 Validate your business idea with real customers</li>
                  <li>🎯 Start side hustle while keeping day job</li>
                  <li>🎯 Build MVP in 3 months or less</li>
                  <li>🎯 Get first 10 paying customers before quitting</li>
                  <li>🎯 Save 6-12 months emergency fund first</li>
                </>
              )}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Top Certifications for {education}</h3>
            </div>

            <div className="space-y-2">
              {education === 'tech' && (
                <>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">AWS Solutions Architect</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cost: $150 | Study Time: 2-3 months | ROI: +$15k salary
                    </p>
                  </div>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">Google Cloud Professional</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cost: $200 | Study Time: 3 months | ROI: High demand
                    </p>
                  </div>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">Certified Kubernetes Admin (CKA)</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cost: $395 | Study Time: 4 months | ROI: DevOps specialist
                    </p>
                  </div>
                </>
              )}
              {education === 'business' && (
                <>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">CFA Level 1</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cost: $1,250 | Study Time: 300 hours | ROI: Finance career boost
                    </p>
                  </div>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">PMP Certification</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cost: $555 | Study Time: 2-3 months | ROI: PM roles +$20k
                    </p>
                  </div>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">Google Analytics Certification</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cost: Free | Study Time: 1 month | ROI: Marketing essential
                    </p>
                  </div>
                </>
              )}
              {education === 'creative' && (
                <>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">Adobe Certified Expert</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cost: $180 | Study Time: 2 months | ROI: Design credibility
                    </p>
                  </div>
                  <div className="p-3 glass-card rounded-lg">
                    <p className="font-medium text-sm">Google UX Design Certificate</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cost: $234 | Study Time: 6 months | ROI: Entry to UX field
                    </p>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="glass-card p-4">
            <h3 className="font-semibold mb-3">Learning Resources Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>📚 Focus on skills that have immediate job market value</li>
              <li>📚 Online courses are 70% cheaper than traditional education</li>
              <li>📚 Certifications boost resume visibility by 40%</li>
              <li>📚 Build portfolio projects while learning</li>
              <li>📚 Network in online communities (Reddit, Discord, LinkedIn)</li>
              <li>📚 Practice > Theory - apply what you learn immediately</li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LevelUpGuide;
