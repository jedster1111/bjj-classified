[How to use Terraform with DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-terraform-with-digitalocean)

- `export TF_LOG=1` to enable Terraform logging to STDOUT (*Note* this does a **lot** of logging!)
- Add `export DO_BJJ_CLASSIFIED_PAT="Your DigitalOcean Personal Access Token"` to `~/.zshrc`
- Run `terraform init`
- See the plan: `terraform plan -var "do_token=${DO_BJJ_CLASSIFIED_PAT}" -var "pvt_key=$HOME/.ssh/id_rsa"`
- Apply the plan: `terraform apply -var "do_token=${DO_BJJ_CLASSIFIED_PAT}" -var "pvt_key=$HOME/.ssh/id_rsa"`
- Note you can't use a password protected SSH key
- Show the current state of your environment `terraform show terraform.tfstate`
- Refresh the state of your environment `terraform refresh -var "do_token=${DO_BJJ_CLASSIFIED_PAT}" -var "pvt_key=$HOME/.ssh/id_rsa"`
