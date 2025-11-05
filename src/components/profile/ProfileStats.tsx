const ProfileStats = () => {
  const stats = [
    { label: "Posts", value: "342", trend: "+12" },
    { label: "Followers", value: "24.5K", trend: "+1.2K" },
    { label: "Following", value: "891", trend: "+34" },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <button
            key={stat.label}
            className="group text-center space-y-1 hover:scale-105 transition-transform"
          >
            <div className="text-2xl font-bold gradient-text">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
            <div className="text-xs text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {stat.trend}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
