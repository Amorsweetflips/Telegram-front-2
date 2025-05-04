FROM nginx:stable-alpine
# overwrite the default nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# serve the built front-end
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
