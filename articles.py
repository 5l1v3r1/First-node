# Graa 2013
# Manage articles on node.js server

# Written for Python 3.2

from sys import argv
from datetime import datetime
from os import remove, listdir, mkdir
from subprocess import call
from shutil import copyfile


my_editor		= 'D:/Software/Installed/Sublime Text 2/sublime_text.exe'
backup_location	= 'F:/Backup/'


def usage():
	print("Commands: add <name>, edit <name>, rm <name>, list, backup")
	exit(0)

def checkarg(n):
	if len(argv) < n:
		usage()
		exit(0)

def get_articles():
	'''
		Get articles file in array
		'''
	# Get articles file
	f = open('static/articles/articles','r')
	data = f.readlines()
	f.close()
	return data

def write_articles_line(name, f):
	f.write('<p><a class="button" href="#" onclick="loadcont(\'articles/' + name + '\', \'content\');">' + name.capitalize() + '</a></p>\n')
	
def article_input():
	'''
		Get user input for article
		'''
	print("Enter article. End with '.' on an empty line.")
	s = tmp = ''
	tmp = input('')
	while tmp != ".":
		s += tmp + '<br>'
		tmp = input('')
	return s

def add_article(name, text):
	'''
		Add article to article directory, and add name to articles file
		'''
	# Store article
	f = open('static/articles/' + name, 'a')	# so we can't overwrite existing articles
	f.write('<span class="date">' + datetime.now().strftime("%Y-%m-%d") + '</span>\n')
	f.write('<p>' + text + '</p>')
	f.close()
	# Store article name in articles file
	f = open('static/articles/articles', 'a')
	write_articles_line(name, f)
	f.close()

	print ("Article added")

def remove_article(name):
	'''
		Remove article from article directory and articles file
		'''
	# Remove from article directory
	remove('static/articles/' + name)
	# Get articles file
	data = get_articles()
	# Write articles file without the article
	f = open('static/articles/articles','w')
	for line in data:
		if 'static/articles/' + name in line:
			continue
		f.write(line)

	print ("Article removed")

def edit_article(name):
	'''
		Edit article using user's own my_editor
		'''
	# Copy article to temporary file
	copyfile('static/articles/' + name, 'tmp/tmparticle')
	print("Copying to temporary file..\n")
	# Let user edit the file
	call([my_editor, 'tmp/tmparticle'])
	tmp = input('Press enter if done')
	# Copy temporary file to article, changing the date
	print("Copying to article..\n")
		# Reading tmp article
	f = open('tmp/tmparticle', 'r')
	data = f.readlines()
	f.close()
		# Write to article, changing the date
	f = open('static/articles/' + name, 'w')
	for i,line in enumerate(data):
		if i == 0:
			f.write('<span class="date">' + datetime.now().strftime("%Y-%m-%d") + '</span>\n')
			continue
		f.write(line)
	f.close()
	# Remove temporary file
	remove('tmp/tmparticle')

	# Get articles file
	data = get_articles()
	# Write articles file, place changed file on top
	f = open('static/articles/articles','w')
	write_articles_line(name, f)
	for line in data:
		if name in line:
			continue
		f.write(line)
	f.close()
	print("Article editted\n")

def list_articles():
	print("\tArticles:\n")
	for article in listdir('static/articles/'):
			if article != 'articles': print("\t\t" + article)
	exit(0)

def backup_articles():
	'''
		Backup articles. Articles will be written to backup_location
		'''
	# Make time directory
	timedir = str(datetime.now().strftime("articles_%Y_%m_%d_%H_%M"))
	backup_dir = backup_location + timedir + '/'
	mkdir(backup_dir)
	# Copy files
	print("Copying files to " + backup_dir + "..")
	for article in listdir('static/articles/'):
		copyfile('static/articles/' + article, backup_dir + article)
	exit(0)

def main():
	'''
		Main function. Processes basic user input.
		'''
	checkarg(2)

	# Help function
	if argv[1] == 'help':
		usage()

	# List articles
	if argv[1] == 'list':
		list_articles()

	# Backup articles
	if argv[1] == 'backup':
		backup_articles()

	checkarg(3)
	name = argv[2]

	# Add article
	if argv[1] == 'add':
		text = article_input()
		add_article(name, text)

	# Remove article
	elif argv[1] == 'rm':
		remove_article(name)

	# Edit article
	elif argv[1] == 'edit':
		edit_article(name)


if __name__ == "__main__":
	main()