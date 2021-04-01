# github-action-demo

This is demo repository to test `alpha-ci` with github actions

## GPG commands

Search keys 

```shell
$ gpg --list-secret-keys --keyid-format LONG
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot 
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```

Getting private key

```shell
$ gpg --armor --export 3AA5C34371567BD2
# Prints the GPG key ID, in ASCII armor format
```
