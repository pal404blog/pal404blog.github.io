---
layout: post
title:  "Automating AWS EC2 with Ansible: A Beginner's Guide"
description: Ansible in AWS
date:   2024-03-28 17:00:45 -0800
image:  "https://images.unsplash.com/photo-1667372335936-3dc4ff716017?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
tags:   [AWS]
---


![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)


###What is Ansible?

Ansible is a powerful open-source IT automation tool. Unlike traditional configuration management tools that require agents on managed nodes, Ansible is agentless. It uses SSH to connect to your servers and execute tasks defined in playbooks. This makes Ansible lightweight and easy to adopt.

###Ansible and Configurations

Ansible excels at managing configurations across multiple servers. You define the desired state of your system (e.g., software installed, packages updated, files copied) in playbooks, which are YAML-based files containing instructions. Ansible then executes these playbooks on your target machines, ensuring they all reach the desired state.

###Setting Up Ansible on Your Control Machine

Here's how to get started with Ansible on your control machine (the machine you'll use to run playbooks):

###Install Ansible:

The installation method depends on your operating system. Here's an example for Amazon Linux 2:


> sudo yum update
sudo amazon-linux-extras install ansible2 ansible
 sudo yum update
sudo amazon-linux-extras install ansible2 ansible
ansible --versionansible --version

### Create an Inventory File:

An inventory file defines the machines Ansible will manage. You can use a simple static file listing IP addresses or hostnames, or leverage dynamic inventory plugins to discover EC2 instances automatically. Here's a basic static inventory example:

> [myhosts]
server1 ansible_host=10.0.0.1
server2 ansible_host=10.0.0.2

### Write Your Playbook:

Playbooks are the heart of Ansible automation. They define tasks to be executed on your managed servers. Here's an example that installs the docker package and configures Docker to start automatically on all servers in the myhosts group:


````

---
- hosts: all
  become: true
  vars:
    container_count: 4
    default_container_name: docker
    default_container_image: ubuntu
    default_container_command: sleep 1d

  tasks:
    - name: Install aptitude
      apt:
        name: aptitude
        state: latest
        update_cache: true

    - name: Install required system packages
      apt:
        pkg:
          - apt-transport-https
          - ca-certificates
          - curl
          - software-properties-common
          - python3-pip
          - virtualenv
          - python3-setuptools
        state: latest
        update_cache: true

    - name: Add Docker GPG apt Key
      apt_key:
        url: https://download.docker.com/linux/ubuntu/gpg
        state: present

    - name: Add Docker Repository
      apt_repository:
        repo: deb https://download.docker.com/linux/ubuntu focal stable
        state: present

    - name: Update apt and install docker-ce
      apt:
        name: docker-ce
        state: latest
        update_cache: true

    - name: Install Docker Module for Python
      pip:
        name: docker

    - name: Pull default Docker image
      community.docker.docker_image:
        name: "{{ default_container_image }}"
        source: pull

    - name: Create default containers
      community.docker.docker_container:
        name: "{{ default_container_name }}{{ item }}"
        image: "{{ default_container_image }}"
        command: "{{ default_container_command }}"
        state: present
      with_sequence: count={{ container_count }}
	  ```


### Running Your Playbook

With your control machine set up, you can run your playbook:


> ansible-playbook myplaybook.yaml
