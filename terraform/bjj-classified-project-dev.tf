resource "digitalocean_project" "BJJ-Classified-Dev" {
  name        = "BJJ-Classified-Dev"
  purpose     = "Web Application"
  environment = "Development"
  resources = [
    digitalocean_droplet.www-1.urn,
    digitalocean_droplet.www-2.urn,
    digitalocean_loadbalancer.www-lb.urn,
    digitalocean_domain.dev.urn,
  ]
}
