docker:
	docker run -d --name node-ai-jira -p 3005:3005 node-ai-jira

serve:
	npm run serve

ngrok:
	ngrok http 3005

serve_local: serve ngrok

serve_docker: docker ngrok
