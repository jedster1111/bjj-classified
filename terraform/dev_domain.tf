resource "digitalocean_domain" "dev" {
   name = "dev.bjj-classified.co.uk"
   ip_address = digitalocean_loadbalancer.www-lb.ip
}

resource "digitalocean_record" "CNAME-www" {
  domain = digitalocean_domain.dev.name
  type = "CNAME"
  name = "www"
  value = "@"
}
