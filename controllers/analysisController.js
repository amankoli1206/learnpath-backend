const User = require('../models/User');

exports.getSkillGapAnalysis = async (req, res) => {
  try {
    // Simulate an AI-based skill gap analysis algorithm
    const user = await User.findById(req.user.id).populate('skillProfile.skill');
    
    if (!user || !user.skillProfile || user.skillProfile.length === 0) {
      return res.json({
        message: "AI Analysis Complete",
        status: "Insufficient Data",
        recommendations: ["Add skills to your profile so our AI can analyze your learning gaps!"]
      });
    }

    // Generate smart recommendations based on current vs desired levels
    const recommendations = user.skillProfile.map(profile => {
      const skillName = profile.skill ? profile.skill.name : 'Unknown Skill';
      
      if (profile.currentLevel === 'Beginner' && profile.desiredLevel === 'Expert') {
        return `AI Insight: Massive gap detected in ${skillName}. Recommendation: Enroll in a Bootcamp or Masterclass immediately.`;
      } else if (profile.currentLevel !== profile.desiredLevel) {
        return `AI Insight: You are close to your goal in ${skillName}. Recommendation: Focus on building practical projects.`;
      } else {
        return `AI Insight: You have mastered ${skillName}! Recommendation: Consider mentoring others.`;
      }
    });

    res.json({
      message: "AI-based Skill Gap Analysis Generation Successful",
      totalGapsIdentified: recommendations.length,
      aiRecommendations: recommendations,
      suggestedNextSteps: ["Review AI insights", "Enroll in recommended resources", "Update milestones"]
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
