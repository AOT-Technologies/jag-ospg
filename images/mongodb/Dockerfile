FROM registry.access.redhat.com/rhscl/mongodb-36-rhel7

MAINTAINER Victor Ameh <victor.ameh@aot-technologies.com>

LABEL Remarks="Dockerfile to update packages to address vulnerability CVE-2021-43527"

#Update Software Repository
USER root

RUN yum -y update

USER default
