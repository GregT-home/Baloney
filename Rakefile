task :default => [:spec] do
  # no default task, currently
end

desc "Delete standard temporary files, Emacs *~ files, in particular"
task :clean do
  sh 'find . \( -name "*~" -or -name "\#*\#" -or -iname "tmp-paged*mp.html" \) -exec rm -vf {} \;'
end

