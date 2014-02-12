task :default => [:spec] do
  # no default task, currently
end

task :clean do
#  files = Dir["*~", "*/*~", "*/*/*~"].join(" ")
#  sh "rm #{files}"
  sh 'find . -name "*~" -exec rm -v {} \;'
  sh 'rm -f tmp-pagedump.html'
end

